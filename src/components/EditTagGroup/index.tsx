import * as React from 'react'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'
import { Tag, Input, Tooltip, Icon } from 'antd';

interface Props {
  tags: string[]
  newTagName: string
  updateStateProp:(value:string[],name?:string)=>{}
}

interface State {
  tags: string[]
  newTagName: string
  inputVisible: boolean
  inputValue: string
}
export default class EditableTagGroup extends React.Component<Props, State> {
  input: any
  state:State = {
    tags: [],
    newTagName:'',
    inputVisible: false,
    inputValue: ''
  };

  handleClose = (removedTag: any) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    // console.log(tags);
    this.setState({ tags });
    this.props.updateStateProp(tags)
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e: any) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    // console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });

    this.props.updateStateProp(tags)
  }

  saveInputRef = (input: any) => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag 
            key={tag} 
            closable={true} 
            afterClose={() => this.handleClose(tag)}
            style={{ background: '#fff',height:'30px',padding:'5px',fontSize:'14px',textAlign:'center'}}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed',height:'30px',padding:'5px',fontSize:'14px',textAlign:'center' }}
          >
            <Icon type="plus" /> {this.state.newTagName}
            </Tag>
        )}
      </div>
    );
  }

  componentWilllMount(){

    this.setState({
      tags:this.props.tags,
      newTagName:this.props.newTagName
    })

  }
  componentWillReceiveProps(nextProps:any){
    this.setState({
      tags:nextProps.tags,
    })
  }
}