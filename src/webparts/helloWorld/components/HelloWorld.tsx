import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps, IHelloWorldState } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldState> {
  constructor(props: IHelloWorldProps) {
    super(props);

    this.state = {
      listItems: []
    }
  }

  public async componentDidMount(): Promise<void> {
    let items = await this.props.spDataProvider.getListItems(this.props.listTitle, this.props.numberOfItems);
    if (items !== null && items !== undefined && items.length > 0) {
      this.setState({
        listItems: items
      });
    }
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.listTitle)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
              {
                this.state.listItems.map(item => {
                  return (
                    <div>
                      <div>{item.Id}</div>
                      <div>{item.Title}</div>
                      <div>{item.Created}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
