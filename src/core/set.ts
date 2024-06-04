// import { getSelectionCharacterOffsetWithin } from ".";
// import { isInput, isTextarea } from "./utils";

// interface SetSelectionOptions{
//     start: number
//     end: number
//     direction: 'forward' | 'backward' | 'none'
// }

// export function setInputSelection(element: HTMLElement, options:SetSelectionOptions) {
// const el = element as HTMLInputElement
// el.setSelectionRange(options.start, options.end, options.direction || 'forward')

// }

// export function setTextareaSelection(element: HTMLElement, options: SetSelectionOptions) {
//     const el = element as HTMLTextAreaElement
//     el.setSelectionRange(options.start, options.end, options.direction || 'forward')

// }

// export function setContentEditableSelection(element: HTMLElement) {
//     const { start, end} = getSelectionCharacterOffsetWithin(element)

//     // Create a new range
//     const range = document.createRange();

//     // Create a walker to traverse the text nodes within the contenteditable element
//     const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT , null);

//     let currentNode = walker.nextNode();
//     let currentOffset = 0;
//     let startNode: Node | null = null;
//     let startOffset = 0;
//     let endNode: Node | null = null;
//     let endOffset = 0;

//     while (currentNode) {
//         const nodeLength = currentNode.textContent?.length  || 0;

//         // Determine the start node and offset
//         if (!startNode && start <= currentOffset + nodeLength) {
//             startNode = currentNode;
//             startOffset = start - currentOffset;
//         }

//         // Determine the end node and offset
//         if (!endNode && end <= currentOffset + nodeLength) {
//             endNode = currentNode;
//             endOffset = end - currentOffset;
//             break;
//         }

//         currentOffset += nodeLength;
//         currentNode = walker.nextNode();
//     }

//     if (startNode && endNode) {
//         range.setStart(startNode, startOffset);
//         range.setEnd(endNode, endOffset);

//         // Apply the range to the selection
//         const selection = window.getSelection();
//         if (selection) {
//             selection.removeAllRanges();
//             selection.addRange(range);

//             // Adjust the direction of the selection
         
//     }
//     return { startOffset, endOffset}
// }
// }


// export function setNativeSelection(element:HTMLElement){
    
// }

// export function setSelection(element: HTMLElement, options: SetSelectionOptions) {
//     if (isInput(element)) {
//         return setInputSelection(element,options)
//     } else if (isTextarea(element)) {
//         return setTextareaSelection(element,options)
//     } else {
//         return setContentEditableSelection(element)
//     }
// }
