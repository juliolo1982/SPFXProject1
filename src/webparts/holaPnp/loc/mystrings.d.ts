declare interface IHolaPnpWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  Property1FieldLabel: string;
}

declare module 'HolaPnpWebPartStrings' {
  const strings: IHolaPnpWebPartStrings;
  export = strings;
}
