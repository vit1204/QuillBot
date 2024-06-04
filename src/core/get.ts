
// import { isInput, isTextarea } from "./utils";


// interface GetSelectionResult{
//     start: number
//     end: number
//     direction: 'forawrd' | 'backward' | 'none',
//     text: string
// }

// function getDefaultSelection():GetSelectionResult {
// return {
//     start: 0,
//     end: 0,
//     direction: 'none',
//     text: ''
//       }
// }


// export function getInputSelection(element: HTMLElement){
//     const inputEl = element as HTMLInputElement

//     const result = {
//         start: inputEl.selectionStart,
//         end: inputEl.selectionEnd,
//         direction: inputEl.selectionDirection,
//         text: inputEl.value.slice(inputEl.selectionStart || 0 , inputEl.selectionEnd || 0)

        
//     }    
//     return result  as GetSelectionResult


// }

// export function getTextareaSelection(element: HTMLElement){
// const textareaEl = element as HTMLTextAreaElement
//     const result = {
//         start: textareaEl.selectionStart,
//         end: textareaEl.selectionEnd,
//         direction: textareaEl.selectionDirection,
//         text: textareaEl.value.slice(textareaEl.selectionStart || 0, textareaEl.selectionEnd || 0)
//     }    

//     return result as GetSelectionResult


// }


// export function getSelectionCharacterOffsetWithin(element: HTMLElement){
//     let start  = 0
//     let end = 0

//     const selection = window.getSelection()
//     if(selection?.rangeCount){
//         const range = selection.getRangeAt(0)
//         const preCaretRange = range.cloneRange()
//         preCaretRange.selectNodeContents(element)
//         preCaretRange.setEnd(range.startContainer, range.startOffset)
//         start = preCaretRange.toString().length

//         preCaretRange.setEnd(range.endContainer, range.endOffset)   
//         end = start + range.toString().length
//     }
//     return{start,end}
// }

// export function getContentEditableSelection(element: HTMLElement){
//  const selection = window.getSelection()
//  if(!selection?.rangeCount){
//      return getDefaultSelection()
//  }

//   const range = selection.getRangeAt(0)
//   const {start , end } = getSelectionCharacterOffsetWithin(range?.commonAncestorContainer as HTMLElement)
//   const clonedSelection = range!.cloneContents()

//   const tempDiv = document.createElement('div')
//     tempDiv.appendChild(clonedSelection)
//     return{
//         text: tempDiv.innerHTML || range?.toString() || tempDiv.textContent || '',
//         start,
//         end,
//         direction: 'forward' as const
//     }
// }



// export function getSelection(element: HTMLElement){
//     if(isInput(element)){
//         return getInputSelection(element)
//     }else if(isTextarea(element)){
//         return getTextareaSelection(element)
// } else{
//     return getContentEditableSelection(element)
// }
// }
