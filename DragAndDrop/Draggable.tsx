import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { IDropDataSchema } from './DragSchema';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';

export interface IDraggableProps {
  name: string;
  data ?: string;
  isDraggable?: boolean;
  isDroppable?: boolean;
  iconName ?: string;
  iconAlign?: "Left" | "Right" | "Center";
  iconVerticalAlign?: "Top" | "Bottom" | "Center";
  depthDragImage: number;
  setDroppedData : (data: IDropDataSchema) => void;
  setIsDragging : (isDragging: boolean) => void;
  width ?: number,
  height ?: number;
  iconColor ?: string;
  iconSize ?: string;
  callIsClicked ?: () => void;
}

function DraggableComponent ({name, data, setDroppedData, setIsDragging, isDraggable, isDroppable, iconName, iconAlign, iconVerticalAlign, depthDragImage,   width, height, iconColor, iconSize, callIsClicked}: IDraggableProps) {
  

  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(`dianamics.draganddrop.${name}`, name); 
    event.dataTransfer.setData(`dianamics.draganddrop.data`, data ?? "");     
    //const offsetX = event.clientX - event.currentTarget.getBoundingClientRect().left;
    //const offsetY = event.clientY - event.currentTarget.getBoundingClientRect().top;
   // event.dataTransfer.setData(`dianamics.draganddrop.${name}.clientX`, offsetX.toString());   
   // event.dataTransfer.setData(`dianamics.draganddrop.${name}.clientY`, offsetY.toString());   

    const crt = getParentInDepnth(event.currentTarget, depthDragImage);
    //var crt = event.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;     
    if(crt){     
      event.dataTransfer.setDragImage(crt, 0, 0); 
    }    
    setIsDragging(true);
  }  

  const dragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
  }

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if(isDroppable === false) return;
    const sameName = event.dataTransfer.types.includes(`dianamics.draganddrop.${name}`);
    if(!sameName) {
      event.preventDefault();
      return;
    }

    const data = event.dataTransfer.getData(`dianamics.draganddrop.data`);
    
    //const offsetX = parseInt(event.dataTransfer.getData(`dianamics.draganddrop.${name}.clientX`), 10);
    //const offsetY = parseInt(event.dataTransfer.getData(`dianamics.draganddrop.${name}.clientY`), 10);
    const boundingRect = event.currentTarget.getBoundingClientRect();
   /* console.log("drop client", event.clientX, event.clientY);
    console.log("drop curreTarget", currentTargetRect.left, currentTargetRect.top);
    console.log("drop offset", event.currentTarget.offsetLeft, event.currentTarget.offsetTop);
    console.log("client offset", event.currentTarget.getClientRects());    */
    //boundingRect.width != event.currentTarget.clientWidth --> we can calculate the transform ratio
    const transformX  = event.currentTarget.clientWidth * 100 / boundingRect.width;
    const transformY = event.currentTarget.clientHeight * 100 / boundingRect.height;
    setDroppedData({
        From : `dianamics.draganddrop.${name}`.replace("dianamics.draganddrop.", ""), 
        Data : data, 
        X: Math.round((event.clientX - boundingRect.left)* transformX / 100), 
        Y: Math.round((event.clientY - boundingRect.top) * transformY / 100)
      });
    
  }

  const allowDrop= (event: React.DragEvent<HTMLDivElement>) => {    
    if(isDroppable === false ) return;
    const sameName = event.dataTransfer.types.includes(`dianamics.draganddrop.${name}`);
    if(!sameName) {      
      return;
    }
    event.preventDefault();    
  }
  

  return (
    <Stack draggable={isDraggable} onDragStart={dragStart} onDragEnd={dragEnd} onDrop={onDrop} onDragOver={allowDrop} 
      onClick={callIsClicked}
      style={{
          width: width ? `${width}px` : "100%", 
          height: height ? `${height}px` : "100%", 
          padding: "2px"
        }} 
        horizontal
        horizontalAlign={iconAlign == "Center" ? "center" : iconAlign == "Left" ? "start" : "end" }
        verticalAlign={iconVerticalAlign == "Center" ? "center" : iconVerticalAlign == "Top" ? "start" : "end"}
        >
          
      <Icon iconName={iconName} style={{ color: iconColor, fontSize: iconSize ?? "xx-large"}}/>
        
    </Stack>
  ) 
}

export const Draggable = React.memo(DraggableComponent);


function getParentInDepnth(current: HTMLElement, depth: number): HTMLElement {
  if(depth === 0 || current.parentElement==null || current.parentElement == current ) return current;
  return getParentInDepnth(current.parentElement, depth - 1);
}