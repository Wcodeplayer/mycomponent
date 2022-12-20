component
    表单
    Form（:model={contain all formItem date} :rules={rules about all formItem}）{
        rules:{
            password:[
                    {required:true , message:"密码必填"} // this required the password should not be empty
                ]
        }

提供FormItem的校验规则
        提供validate() 去校验具有prop属性的formItem
    }
        FormItem(:prop=(name in rules) :label=(title)){
            展示title
            展示rules里的校验错误信息

    }
            FormInput{
                双向绑定数据
                自响应的输入属性判别 text/password
            }
    弹窗
    Notice
    按照props{title,message,time} 弹出的窗口信息

    --create.js创建Notice组件实例挂载于body
