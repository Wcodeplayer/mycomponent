import store from '../store'
export default{
    inserted(el,binding){
        const {value:permissionRoles} = binding;

        const roles = store.getters.roles;

        if(permissionRoles && permissionRoles instanceof Array && permissionRoles.length>0 ){
            const hasPermisson = roles.some(rol=>{
                return permissionRoles.includes(rol)
            });

            if(!hasPermisson){
                el.parentNode && el.parentNode.removeChild(el);
            }
        }else{
            throw new Error('需要指定权限(数组类型)')
        }


    }
}