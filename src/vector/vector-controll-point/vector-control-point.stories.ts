import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { action } from '@storybook/addon-actions';

import {VectorControllPointComponent} from './vector-controll-point.component'
import { VectorInteractiveComponent } from '../vector-interactive/vector-interactive.component';


const meta: Meta<any> = {
    title:"VectorControlPoint",
    component:VectorInteractiveComponent,
    tags:['autodocs'],
    argTypes:{
        onChange:{action:'onChange'}
    },
    decorators:[
        moduleMetadata({
            imports:[VectorControllPointComponent]
        })
    ],
    render:(args:any) => {
        
        return {
            props:{
                ...args,
                onChange:action("onChange",{lazyEval:true})
            },
            template:`<nx-vector-interactive [width]="600" [height]="200">
                <nx-vector-controll-point ${argsToTemplate(args)}></nx-vector-controll-point>
            </nx-vector-interactive>`
        }
    }
}

export default meta;
type Story = StoryObj<any>;
export const Default: Story = {
    args: {
      coords:{x:50,y:50},
      visible:true,
      innerRadius:8,
      outerRadius:12,
      color:"red"
    },
  };