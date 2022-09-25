import { GlobalStyle } from 'components/GlobalStyle';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import ContactsSection from 'components/Section';
import { Section, Title } from './App.styled';
import {
  addContact,
  removeContact,
  filterChange,
  getContacts,
  getFilterValue,
} from 'redux/contactSlice';

export const App = () => {
  const items = useSelector(getContacts);
  const filterValueReducer = useSelector(getFilterValue);
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState(items);
  const [filter, setFilter] = useState(filterValueReducer);

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;
    const contactsNames = contacts.find(contact => contact.name === name);
    const contactsNumbers = contacts.find(contact => contact.number === number);
    const contact = { id: nanoid(), name, number };

    if (contactsNames) {
      Swal.fire({
        title: 'Error!',
        text: `Sorry, ${name} is already in your contacts`,
        icon: 'error',
        confirmButtonText: 'Got it',
      });
      return;
    }
    if (contactsNumbers) {
      Swal.fire({
        title: 'Error!',
        text: `Sorry, ${number} is already in your contacts`,
        icon: 'error',
        confirmButtonText: 'Got it',
      });
      return;
    }
    dispatch(addContact(contact));
    setContacts(prevState => [contact, ...prevState]);
    e.target.reset();
  };

    const handleDeleteClick = id => {
    const filtered = items.filter(item => item.id !== id);
    dispatch(removeContact(id));
    setContacts(filtered);
  };

  const handleChangeFilter = e => {
    const inputValue = e.target.value;
    dispatch(filterChange(inputValue));
    setFilter(inputValue);
  };

  const createFilter = () => {
    const normalizedFilterValue = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(
      contact =>
        contact.name.toLocaleLowerCase().includes(normalizedFilterValue) ||
        contact.number.toString().includes(normalizedFilterValue)
    );
    return filteredContacts;
  };

  const filteredContacts = createFilter();

  return (
    <Section>
      <GlobalStyle />
      <div>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={handleSubmit} />
      </div>
      <ContactsSection title="Contacts">
        <Filter handleChangeFilter={handleChangeFilter} filter={filter} />
        <ContactList
          filter={filteredContacts}
          handleClick={handleDeleteClick}
        />
      </ContactsSection>
    </Section>
  );
};
