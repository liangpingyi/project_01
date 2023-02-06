// var that;
class tab {
    constructor(id){
        // that = this;
        //获取元素
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        //section的父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }

    init(){
        this.updateNode();
        //init 初始化操作让相关的元素绑定事件
        this.add.onclick =this.addTab.bind(this.add,this);
        for (var i =0;i<this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i],this);
            this.remove[i].onclick = this.removeTab.bind(this.remove[i],this);
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    //因为动态添加元素 需要重新获取对象元素
    updateNode(){
    this.lis = this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');
    this.remove = this.main.querySelectorAll('.icon-guanbi');
    this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
 }
    //切换功能
    toggleTab(that){
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    //清除所有类
    clearClass(){
        for (var i =0;i<this.lis.length;i++){
            this.lis[i].className = '';
            this.sections[i].className='';
        }
    }
    // 添加功能
    addTab(that){
        that.clearClass();
        //创建li元素和section元素 
        var random =Math.random();
        var li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试'+ random +'</section>';
        //把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend',li);
        that.fsection.insertAdjacentHTML('beforeend',section);
        that.init();
    }
    //删除功能
    removeTab(that,e){
    e.stopPropagation();//阻止冒泡 防止触发li的点击事件
        var index = this.parentNode.index;
        //remove是js中删除节点的方法，根据索引号删除对应的li 和section
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //当删除的不是选中状态时，原来的li状态保持不变
        if(document.querySelector('.liactive')) return;
        //当删除选中状态的li时，让它的前一个li处于选中状态
        index--;
        //手动调用点击事件 不需要鼠标触发
        that.lis[index]&&that.lis[index].click();
    }
    //修改功能
    editTab(){
        var str = this.innerHTML;
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text"/>';
        var input = this.children[0];
        input.value = str;
        input.select();//文本框里面的文字处于选定状态
        // 当我们离开文本框就把文本框里面的值给span 
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        };
        //按下回车也可以把文本框保存
        input.onkeyup = function(e) {
            if(e.keyCode===13){
                //手动调用表单失去焦点事件 不需要鼠标离开
                this.blur();
            }
        }
    }
}
new tab('#tab');