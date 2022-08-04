import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
    const date = parseISO(dateString)
    // You can view the different format() string options on the date-fns website.
    return <time dateTime={dateString}>{format( date, 'LLLL d, yyyy' )}</time>
}