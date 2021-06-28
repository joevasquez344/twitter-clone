import React, {useState} from 'react'
import Modal from 'components/modals/Modal';

const ModalContainer = ({components: Component, ...rest}) => {
    const [isOpen, setOpen] = useState(false);

    const toggle = () => (isOpen ? setOpen(false) : setOpen(true));

    return (
        <div className='modal-container'>
            <Component toggle={toggle} isOpen={isOpen} {...rest}></Component>
        </div>
    )
}

export default ModalContainer
