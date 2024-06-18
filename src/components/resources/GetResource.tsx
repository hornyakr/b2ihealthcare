'use client'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { changeResult, selectSearch } from "@/lib/features/resources/searchFormSlice"
import { useAppSelector } from "@/lib/hooks"
import { useGetResourcesQuery } from "@/services/snowOwlApi"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoaderCircle, Info } from 'lucide-react'
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

export type Item = {
    id: string
    url: string
    title: string
    language: string
    description: string
    status: string
    copyright: string
    owner: string
    contact: string
    bundleAncestorIds: string
    bundleId: string
    createdAt: string
    updatedAt: string
    settings: string
    oid: string
    branchPath: string
    toolingId: string
    dependencies: string
    resourceType: string
    resourceURI: string
    resourcePathSegments: string
}

interface Props {
    firstInitialized: boolean
    setFirstInitialized: (newValue: boolean) => void
}

export function GetResource({ firstInitialized, setFirstInitialized }: Props) {
    const { toast } = useToast()
    const dispatch = useDispatch<AppDispatch>()
    const formState = useAppSelector(selectSearch)
    const [previousSearch, setPreviousSearch] = useState<string>(formState.form.search)

    const { data, error, isLoading } = useGetResourcesQuery({ title: formState.form.search, limit: formState.form.limit }, {
        skip: firstInitialized
    })

    function getErrorMessage(error: FetchBaseQueryError | SerializedError): string {
        if ('status' in error) {
            return `Error: ${error.status} - ${JSON.stringify(error.data)}`
        } else {
            return error.message || 'An error occurred'
        }
    }

    function selectResult(value: string) {
        dispatch(changeResult(value))

        const matchingItem = data?.items
            .filter((item: Item) => item.id === value)
            .map((item: Item) => `${item.id} | ${item.title}`)
            .join(', ')

        console.log(matchingItem)

        matchingItem && toast({
            title: "Changed result",
            description: `New result: ${matchingItem || 'Item not found'}`,
        })
    }

    function highlightMatchingText(text: string) {
        const regex = new RegExp(`(${formState.form.search})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <strong key={index}>{part}</strong> : part
        );
    }

    useEffect(() => {
        if (firstInitialized && previousSearch !== formState.form.search) {
            setFirstInitialized(false)
            setPreviousSearch(formState.form.search)
        }
    }, [formState.form.search])


    return (
        <>
            {
                isLoading ? (
                    <Alert>
                        <LoaderCircle className="animate-spin h-4 w-4" />
                        <AlertTitle>Loading</AlertTitle>
                        <AlertDescription>
                            Please wait a moment.
                        </AlertDescription>
                    </Alert>
                ) : error ? (
                    <Alert variant={"destructive"}>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {getErrorMessage(error)}
                        </AlertDescription>
                    </Alert>
                ) : !data ? (
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>No query</AlertTitle>
                        <AlertDescription>
                            No data fetched.
                        </AlertDescription>
                    </Alert>
                ) : data?.items.length === 0 ? (
                    <Alert variant={"warning"}>
                        <Info className="h-4 w-4" />
                        <AlertTitle>No data</AlertTitle>
                        <AlertDescription>
                            No data found.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <RadioGroup onValueChange={selectResult} defaultValue={formState.result || undefined}>
                        {data?.items.map((item: Item, key: number) => (
                            <div key={key} className="flex items-center space-x-2 rounded-md border p-2">
                                <RadioGroupItem className="w-fit" value={`${item.id}`} id={`${item.id}`} />
                                <Label htmlFor={`${item.id}`}>{item.id} | {formState.form.search ? highlightMatchingText(item.title) : item.title}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                )
            }
        </>
    )
}