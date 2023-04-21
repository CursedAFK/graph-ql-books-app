import { useQuery, useMutation } from '@apollo/client'
import QUERIES from '../queries/queries'
import { useState } from 'react'

const AddBook = () => {
	const [userInput, setUserInput] = useState({
		name: '',
		genre: '',
		authorId: ''
	})

	const { data, loading } = useQuery(QUERIES.GET_AUTHORS)

	const [addBook, { loading: loadingMutation }] = useMutation(
		QUERIES.ADD_BOOK,
		{
			refetchQueries: [
				{
					query: QUERIES.GET_BOOKS
				},
				'GetBooks'
			]
		}
	)

	const handleChange = e => {
		setUserInput({
			...userInput,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const { data } = await addBook({
				variables: userInput
			})
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form
			id='add-book'
			onSubmit={handleSubmit}
		>
			<div className='field'>
				<label>Book name: </label>
				<input
					type='text'
					name='name'
					value={userInput.name}
					onChange={handleChange}
				/>
			</div>

			<div className='field'>
				<label>Genre: </label>
				<input
					type='text'
					name='genre'
					value={userInput.genre}
					onChange={handleChange}
				/>
			</div>

			<div className='field'>
				<label>Author: </label>
				<select
					name='authorId'
					value={userInput.authorId}
					onChange={handleChange}
				>
					<option hidden>Select author</option>
					{loading ? (
						<option disabled>Loading Authors ...</option>
					) : data.authors.length > 0 ? (
						data.authors.map(author => (
							<option
								key={author.id}
								value={author.id}
							>
								{author.name}
							</option>
						))
					) : (
						<option disabled>No Authors in database</option>
					)}
				</select>
			</div>

			<button
				type='submit'
				disabled={loadingMutation}
			>
				+
			</button>
		</form>
	)
}

export default AddBook
