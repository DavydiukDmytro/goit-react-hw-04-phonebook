import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { ContainerForm, Label, Input, Btn } from './Form.styled';

export const Form = ({ onSubmitAdd }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeValue = ({ target: { value, name } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.warn('Error');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      name,
      number,
      id: nanoid(10),
    };
    onSubmitAdd(newContact);
    setName('');
    setNumber('');
  };

  return (
    <>
      <ContainerForm onSubmit={handleSubmit}>
        <Label>
          Name
          <Input
            value={name}
            type="text"
            name="name"
            onChange={handleChangeValue}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number
          <Input
            value={number}
            type="tel"
            name="number"
            onChange={handleChangeValue}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Btn type="submit">Add contact</Btn>
      </ContainerForm>
    </>
  );
};

Form.propTypes = { onSubmitAdd: PropTypes.func.isRequired };
