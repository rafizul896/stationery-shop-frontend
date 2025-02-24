import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { MdOutlineCreate, MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { RiTakeawayLine } from 'react-icons/ri'

const AdminMenu = () => {
    return (
        <>
            <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
            <MenuItem icon={MdOutlineCreate} label='Create A Product' address='create-product' />
            <MenuItem icon={MdOutlineProductionQuantityLimits} label='Manage Products' address='manage-products' />
            <MenuItem icon={RiTakeawayLine} label='Manage Orders' address='manage-orders' />
        </>
    )
}

export default AdminMenu