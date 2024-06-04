
// // import { setContentEditableSelection, setSelection } from "./set";
// import { isInput, isTextarea } from "./utils";

// interface RemoveSelectionOptions {
//     start: number
//     end: number
//     text: string

// }

// export function removeInputSelection(element: HTMLElement, options: RemoveSelectionOptions) {
//     const el = element as HTMLInputElement
//     const value = el.value
//     const { start, end, text } = options
//     el.value = value.slice(0, start) + text + value.slice(end)


// }


// export function removeTextareaSelection(element: HTMLElement, options: RemoveSelectionOptions) {
//     const el = element as HTMLTextAreaElement
//     const value = el.value
//     const { start, end, text } = options
//     el.value = value.slice(0, start) + text + value.slice(end)
// }


// export function removeContentEditableSelection(element: HTMLElement, options: RemoveSelectionOptions) {
//     // setContentEditableSelection(element, {
//     //     start: options.start,
//     //     end: options.end,
//     //     direction: "backward"
//     // })

//     const { start, end, text } = options
//     const selection = window.getSelection()
//     const range = selection?.getRangeAt(0)

//     range?.deleteContents()

//     range?.insertNode(document.createTextNode(text))
// }

// export function removeSelection(element: HTMLElement, options: RemoveSelectionOptions) {
//     if (isInput(element)) {
//         return removeInputSelection(element, options)
//     } else if (isTextarea(element)) {
//         return removeTextareaSelection(element, options)
//     } else {
//         return removeContentEditableSelection(element, options)
//     }

// }
