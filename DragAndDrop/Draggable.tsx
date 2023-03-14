import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { IDropSchema } from './DragSchema';

export interface IDraggableProps {
  name?: string;
  data ?: string;
  isDraggable?: boolean;
  isDroppable?: boolean;
  iconName : string;
  setDroppedData : (data: IDropSchema) => void;

}
function DraggableComponent ({name, data, setDroppedData, isDraggable, isDroppable, iconName}: IDraggableProps) {
  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(`Dianamics.DragAndDrop`, JSON.stringify({From: name, Data: data}));    
    //loop parentElement until data-control-name = context.mode.label , und noch mal parentElement
    var crt = event.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;     
    if(crt){     
      event.dataTransfer.setDragImage(crt, 0, 0); 
    }
  }  

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    var data = event.dataTransfer.getData("Dianamics.DragAndDrop");
    console.log('dropping ' + data);
    setDroppedData(JSON.parse(data));
  }

  const allowDrop= (event: React.DragEvent<HTMLDivElement>) => {    
    event.preventDefault();    
  }


  return (
    <div onDrop={onDrop} onDragOver={allowDrop} style={{width: "100%", height: "100%"}}>
      <div draggable={true} onDragStart={dragStart} style={{width: "100%", height: "100%"}}>
        <Icon iconName={iconName} style={{fontSize: "xx-large"}} />
      </div>
    </div>
  ) 
}

export const Draggable = React.memo(DraggableComponent);

