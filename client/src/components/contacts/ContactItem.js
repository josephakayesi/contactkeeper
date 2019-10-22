import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact }) => {
    const { deleteContact, setCurrentContact, clearCurrentContact } = useContext(ContactContext)
    const { _id, name, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(_id)
        clearCurrentContact()
    }

    const onEdit = () => {
        setCurrentContact(contact)
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email && (
                    <li>
                        <i className='fa fa-envelope-open' /> {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className='fa fa-phone' /> {phone}
                    </li>
                )}
            </ul>
            <p>
            </p>
            <button className='btn btn-dark btn-sm' onClick={onEdit}>Edit</button>
            <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;
