let histories = [];

let navigate = {
    history: null,
    install(history){
        this.history = history;
        // history.listen(listenerFn);
    },

    /**
     * path 跳转url
     * obj  type:back(后退)|forward(前进，默认，不用带参数) transitionName:可以自己指定的页动画名
     */
    push(path,obj){
        Modal.clear()
        this.history.push({pathname:path, state:obj});
    },

    replace(path,obj){
        Modal.clear()
        this.history.replace({pathname:path, state:obj});
    },

    goBack(index){
        Modal.clear()
        this.history.go(index || -1)
        // histories.pop();
        // let location = histories.pop();
        // if(location){
        //     let type = 'back',
        //         path = location.pathname;
        //     this.push(path, {type:type});
        // }
    }
};

let listenerFn = (location) => {
    histories.push(location);
}

export default navigate;