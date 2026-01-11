import { Dot } from "lucide-react"

export function FormTitle({ title }: { title: string }) {
    return (
        <div className="pt-5 pb-2 text-xl font-semibold uppercase text-center w-full border-b border-black/20 text-black/70">{title}</div>
    )
}

export function FormSubTitle({ subtitle }: { subtitle: string }) {
    return (
        <div className="text-2xl font-medium text-teal-600 underline underline-offset-4 py-2">{subtitle}</div>
    )
}

export function FormSubSubTitle({ subtitle }: { subtitle: string }) {
    return (
        <div className="text-xl flex -translate-x-1 pt-1 items-center justify-start gap-2 font-medium underline underline-offset-4">
            <Dot className="scale-150" />
            <span>{subtitle}</span>
        </div>
    )
}

export const LineSeperator = () =>
    <span className="h-px w-full bg-charcoal-3/30 my-3" />