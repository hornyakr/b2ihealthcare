"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useAppSelector } from "@/lib/hooks"
import { selectSearch, setLimit, setSearchTerm } from "@/lib/features/resources/searchFormSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/lib/store"
import SearchPopover from "./SearchPopover"

const formSchema = z.object({
    search: z.string(),
    limit: z.number().min(1).max(100)
})

export function SearchForm() {
    const dispatch = useDispatch<AppDispatch>()
    const formState = useAppSelector(selectSearch)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formState.form,
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(setSearchTerm(values.search))
        dispatch(setLimit(values.limit))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
                <FormField
                    control={form.control}
                    name="limit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Limit</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={e => {
                                    const value = parseInt(e.target.value, 10)
                                    field.onChange(isNaN(value) ? 10 : value)
                                }} />
                            </FormControl>
                            <FormDescription>
                                Display the first N results of the search request.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SearchPopover
                    input={<FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Type something..." type="search" {...field} className="border-r-0 rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary/20" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />}
                />
            </form>
        </Form>
    )
}
