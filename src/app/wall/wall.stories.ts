import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { action } from '@storybook/addon-actions';


import { VectorInteractiveComponent } from '../../vector/vector-interactive/vector-interactive.component';
import {WallComponent} from './wall.component';

const meta: Meta<any> = {
    title:"WallComponent",
    component:VectorInteractiveComponent,
    tags:['autodocs'],
    argTypes:{
        resize:{action:'resize'},
        selected:{action:'selected'}
    },
    decorators:[
        moduleMetadata({
            imports:[WallComponent]
        })
    ],
    render:(args:any)=>{
        return {
            props:{
                ...args,
                selected:action('selected',{allowFunction:true})
            },
            template:`<nx-vector-interactive [width]="600" [height]="200">
                <nx-wall ${argsToTemplate(args)}></nx-wall>
            </nx-vector-interactive>`
        }
    }
}

export default meta;
type Story = StoryObj<any>;
export const Default: Story = {
    args: {
        coords:{x1:100,x2:300,y1:50,y2:50},
        id:'test'
    },
  };