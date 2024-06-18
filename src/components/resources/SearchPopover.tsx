import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "../ui/button"
import { Search } from 'lucide-react'
import { useRef, useState } from "react"
import { GetResource } from "./GetResource"

interface Props {
    input: React.ReactNode
}

export default function SearchPopover({ input }: Props) {
    const [firstInitialized, setFirstInitialized] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const triggerRef = useRef<HTMLDivElement>(null)

    const handleInteractOutside = (event: Event) => {
        if (triggerRef.current && triggerRef.current.contains(event.target as Node)) {
            return
        }

        setIsOpen(false)
    }

    return (
        <Popover open={isOpen}>
            <PopoverTrigger asChild>
                <div
                    ref={triggerRef}
                    className="flex items-center"
                    onClick={() => {
                        setIsOpen(true)
                    }}>
                    {input}

                    <Button className="rounded-l-none flex items-center gap-1" type="submit">
                        <Search />
                        Search
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="max-h-60 overflow-y-auto w-full max-w-sm"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onInteractOutside={handleInteractOutside}
            >
                <GetResource firstInitialized={firstInitialized} setFirstInitialized={setFirstInitialized} />
            </PopoverContent>
        </Popover >
    )
}
