import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SearchForm } from "./SearchForm"
import { ShowResult } from "./ShowResult"

export function FormCard() {
    return (
        <Card className="w-fit max-w-lg h-fit">
            <CardHeader>
                <CardTitle>Search Snowray</CardTitle>
                <CardDescription>Searching in Snowray api.</CardDescription>
            </CardHeader>
            <CardContent>
                <SearchForm />
            </CardContent>
        </Card>
    )
}
