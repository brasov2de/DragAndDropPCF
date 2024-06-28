import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { IDropDataSchema } from './DragSchema';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';

export interface IDraggableProps {
  name?: string;
  data ?: string;
  isDraggable?: boolean;
  isDroppable?: boolean;
  iconName ?: string;
  iconAlign?: "Left" | "Right" | "Center";
  iconVerticalAlign?: "Top" | "Bottom" | "Center";
  depthDragImage: number;
  setDroppedData : (data: IDropDataSchema) => void;
  width ?: number,
  height ?: number;
  iconColor ?: string;
  iconSize ?: string;
  backgroundColor ?: string;
}

function DraggableComponent ({name, data, setDroppedData, isDraggable, isDroppable, iconName, iconAlign, iconVerticalAlign, depthDragImage,   width, height, iconColor, iconSize, backgroundColor}: IDraggableProps) {
  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(`Dianamics.DragAndDrop.${name}`, data ?? "");    

    const crt = getParentInDepnth(event.currentTarget, depthDragImage);
    //var crt = event.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;     
    if(crt){     
      event.dataTransfer.setDragImage(crt, 0, 0); 
    }
  }  

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if(isDroppable === false) return;
    var data = event.dataTransfer.getData(`Dianamics.DragAndDrop.${name}`);
    setDroppedData({
        From : `Dianamics.DragAndDrop.${name}`.replace("Dianamics.DragAndDrop.", ""), 
        Data : data
      });
    
  }

  const allowDrop= (event: React.DragEvent<HTMLDivElement>) => {    
    if(isDroppable === false ) return;
    event.preventDefault();    
  }


  return (
    <Stack draggable={isDraggable} onDragStart={dragStart} onDrop={onDrop} onDragOver={allowDrop} 
      style={{
          width: width ? `${width}px` : "100%", 
          height: height ? `${height}px` : "100%", 
          backgroundColor: backgroundColor ?? "transparent", 
          padding: "5px"
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