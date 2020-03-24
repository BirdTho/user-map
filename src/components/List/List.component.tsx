import React from "react";

interface ListProps<T, U> {
  data: T[],
  listRef: any,
  ListElement: any | U,
  listKeyFn?: (item: T, index?: number) => string,
  onClick: (data: any) => void,
  [key: string]: any,
}

export default class List<T, U> extends React.PureComponent<ListProps<T, U>> {
  getListItems = (): any => {
    const {
      data,
      listKeyFn,
      onClick,
      ListElement,
    } = this.props;

    return data.map((item: T, index: number) => {
      const key = listKeyFn ? listKeyFn(item, index) : index;
      return <ListElement key={key} data={item} onClick={onClick}/>;
    })
  };

  render() {
    const {
      data,
      listRef,
      ListElement,
      onClick, // Needed to prevent <ul> from receiving onClick handler
      ...rest
    } = this.props;
    return (
      <ul {...rest} ref={listRef}>
        {this.getListItems()}
      </ul>
    )
  }
}