import { ISPListItem } from './../../../models/ISPListItem';
import { SPDataProvider } from './../../../dataProviders/spDataProvider';
import { IHelloWorldWebPartProps } from '../HelloWorldWebPart';

export interface IHelloWorldProps extends IHelloWorldWebPartProps{
  spDataProvider: SPDataProvider
}

export interface IHelloWorldState {
  listItems: ISPListItem[];
}
