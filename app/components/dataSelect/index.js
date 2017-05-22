import React from 'react'
import { Select } from 'antd';
import './index.scss'

const Option = Select.Option;
class DataSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            month:new Date().getMonth()<10?"0"+(new Date().getMonth()+1):new Date().getMonth()+1,
            allday:"",
            day: new Date().getDate()<10?"0"+new Date().getDate():new Date().getDate(),
            hour:new Date().getHours()<10?"0"+new Date().getHours():new Date().getHours(),
            min:new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()
        }
    }
    handleChange(e){
        console.log(e);
    }
    handerData(year,month){
       return new Date(year,month, 0).getDate();
    }
    componentDidMount(){
        this.setState({
            allday:this.handerData(new Date().getFullYear(), (new Date().getMonth()+1))
        })
    }
    handleChangeMonth(e){
        this.setState({
            allday:this.handerData(new Date().getFullYear(), e),
            month:e
        },()=>{
            let day=this.state.day<this.state.allday?this.state.day:this.state.allday;
            let date=new Date().getFullYear()+"-"+this.state.month+"-"+day+" "+this.state.hour+":"+this.state.min+":"+"00"
            this.props.onChange(new Date(date).getTime())
        })

    }
    handleChangeData(e){
        this.setState({
            day:e
        },()=>{
            let date=new Date().getFullYear()+"-"+this.state.month+"-"+this.state.day+" "+this.state.hour+":"+this.state.min+":"+"00"
            this.props.onChange(new Date(date).getTime())
        })
    }
    handleChangeHour(e){
        this.setState({
            hour:e
        },()=>{
            let date=new Date().getFullYear()+"-"+this.state.month+"-"+this.state.day+" "+this.state.hour+":"+this.state.min+":"+"00"
            this.props.onChange(new Date(date).getTime())
         })
    }
    handleChangeMin(e){
        this.setState({
            min:e
        },()=>
        {
            let date=new Date().getFullYear()+"-"+this.state.month+"-"+this.state.day+" "+this.state.hour+":"+this.state.min+":"+"00"
            this.props.onChange(new Date(date).getTime())
         })
    }
    render() {
        const {month,day,hour,min,allday} = this.state;
        const Month = [];
        for (let i = 1; i < 13; i++) {
            if(i<10){
                i="0"+i
            }
            Month.push(<Option key={i}>{i}</Option>);
        }
        const Day = [];
        for (let i = 1; i < allday+1; i++) {
            if(i<10){
                i="0"+i
            }
            Day.push(<Option key={i}>{i}</Option>);
        }
        
        const Hour = [];
        for (let i = 1; i < 60; i++) {
            if(i<10){
                i="0"+i
            }
            Hour.push(<Option key={i}>{i}</Option>);
        }
        return(
            <ul className="dataSelect">
                <li>
                      <span>月</span>
                       <Select
                            value={month}
                            onChange={this.handleChangeMonth.bind(this)}>
                            {Month}
                        </Select>
                </li>
                <li>
                      <span>日</span>
                       <Select
                            value={allday<day?allday:day}
                            optionFilterProp="children"
                            onChange={this.handleChangeData.bind(this)}>
                            {Day}
                        </Select>
                </li>
                <li>
                      <span>时</span>
                       <Select
                            value={hour}
                            optionFilterProp="children"
                            onChange={this.handleChangeHour.bind(this)}>
                            {Hour}
                        </Select>
                </li>
                <li>
                      <span>分</span>
                       <Select
                            value={min}
                            optionFilterProp="children"
                            onChange={this.handleChangeMin.bind(this)}>
                            {Hour}
                        </Select>
                </li>
            </ul>
            
        )
    }

}

export default DataSelect