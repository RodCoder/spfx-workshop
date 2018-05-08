import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISPListItem } from "../models/ISPListItem";

export interface SPDataProviderConfig {
  context: WebPartContext;
}

export class SPDataProvider {
  private context: WebPartContext;

  constructor(config: SPDataProviderConfig) {
    this.context = config.context;
  }

  public async getListItems(listTitle: string, numberOfItems: number): Promise<ISPListItem[]> {
    let response: SPHttpClientResponse = await this.context.spHttpClient
      .get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/Lists/GetByTitle('${listTitle}')/items?$top=${numberOfItems}`,
        SPHttpClient.configurations.v1
      );

    let json = await response.json();
    let items: ISPListItem[] = json.value;

    return items;
  }
}
