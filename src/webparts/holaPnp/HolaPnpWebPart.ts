import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HolaPnpWebPart.module.scss';
import * as strings from 'HolaPnpWebPartStrings';
import * as jQuery from "jquery"; // import("jquery")
import * as bootstrap from "bootstrap"; // import("bootstrap")
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldDateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';
import { IDateTimeFieldValue } from "@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

require("jquery");
require("bootstrap");

export interface IHolaPnpWebPartProps {
  description: string;
  color: string;
  property1: string;
  fecha: IDateTimeFieldValue;
  lists: string | string[];
  valorFecha:string;
}

var valorFecha:string;
var fecha:any;

export default class HolaPnpWebPart extends BaseClientSideWebPart<IHolaPnpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.holaPnp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.mystyle }">${escape(this.properties.description)}</p>
              <p class="${ styles.mystyle }">Color: ${escape(this.properties.color)}</p>
              <p class="${ styles.mystyle }">Fecha: ${escape(valorFecha)}</p>
              <p class="${ styles.mystyle }">DropDwon:  ${escape(this.properties.lists?"a":"b")}</p>
              <button type="button" class="btn btn-danger">mi prueba con git</button>

              <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
              </button>
              
              <!-- Modal -->
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      ...
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>


              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected DateValueChange(propertyPath: string, oldValue: any, newValue: any){
          valorFecha = newValue.displayValue;

  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                  multiline: true,
                  rows:10
                }),
                PropertyPaneTextField('property1', {
                  label: strings.Property1FieldLabel,
                }),
                PropertyFieldColorPicker('color', {
                  label: 'Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.DateValueChange,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),
                PropertyFieldDateTimePicker('datetime', {
                  label: 'Select the date and time',
                  initialDate: this.properties.fecha,
                  dateConvention: DateConvention.DateTime,
                  timeConvention: TimeConvention.Hours12,
                  onPropertyChange: this.DateValueChange,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dateTimeFieldId',
                  showLabels: false
                }),
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
