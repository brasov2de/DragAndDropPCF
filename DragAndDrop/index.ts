import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { DropDataSchema, IDropDataSchema } from "./DragSchema";
import { IDraggableProps , Draggable} from "./Draggable";


export class DragAndDrop implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private dropped : IDropDataSchema;
    private events : Array<() => void> = [];
    private onDrop: any;
    private isDragging: boolean = false;
    
    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        context.mode.trackContainerResize(true);
        this.onDrop = (context as any).events?.OnDrop;
    }

    setDroppedData(data: IDropDataSchema) {
        this.dropped = data;  
        this.events.push(this.onDrop);
        this.notifyOutputChanged();
    }

    setIsDragging(isDragging: boolean) {
        this.isDragging = isDragging;
        this.notifyOutputChanged();
    }
//test
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

      /*  const theme = (context as any).fluentDesignLanguage ? createV8Theme(
            (context as any).fluentDesignLanguage?.brand,
            (context as any).fluentDesignLanguage?.theme
          ): undefined;*/
        
        const props: IDraggableProps = { 
            name : context.parameters.Name.raw?.toLowerCase() ?? "",
            data : context.parameters.DraggedData.raw ?? "",
            isDraggable:  context.parameters.IsDraggable.raw ?? true,
            isDroppable: context.parameters.IsDroppable.raw ?? true,
            iconName: context.parameters.IconName.raw ?? undefined,
            setDroppedData : this.setDroppedData.bind(this), 
            setIsDragging : this.setIsDragging.bind(this),
            iconAlign : context.parameters.IconAlign.raw ?? "Left", 
            iconVerticalAlign : context.parameters.IconVerticalAlign.raw ?? "Top", 
            depthDragImage : context.parameters.DepthDragImage.raw && context.parameters.DepthDragImage.raw>0 ? context.parameters.DepthDragImage.raw :  5, 
            width: context.mode.allocatedWidth,
            height: context.mode.allocatedHeight, 
            iconColor: context.parameters.IconColor.raw  ?? undefined, 
            iconSize: valueOrDefault(context.parameters.IconSize.raw , "xx-large")
           
         };
        return React.createElement(
            Draggable, props
        );
    }

   

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        //trigger the events here   
        if(this.events.length>0){     
            window.setTimeout(() => {
                this.events.forEach((e) => e());                
                this.events = [];  
            }, 0);
            
        }
        return {
            DroppedData: this.dropped, 
            IsDragging: this.isDragging
         };
    }


        /**
     * It is called by the framework prior to a control init to get the output object(s) schema
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns an object schema based on nomenclature defined in manifest
     */
        public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<Record<string, unknown>> {
            return Promise.resolve({
                DroppedData: DropDataSchema
            });
        }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}

function valueOrDefault<T>(value : T | undefined | null, dafultValue: T ) {
    return value === null || value === undefined || value === "" 
        ? dafultValue
        : value;
}
