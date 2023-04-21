import { useQuery } from '@apollo/client'
import QUERIES from '../queries/queries'
import BookDetails from './BookDetails'
import { useState } from 'react'

const BookList = () => {
	const [bookId, setBookId] = useState('')

	const { data, loading, error } = useQuery(QUERIES.GET_BOOKS)

	if (loading) return <p>Loading...</p>

	if (error) return <p>Error connecting to server...</p>

	return (
		<div>
			<ul id='book-list'>
				{data.books.length > 0 ? (
					data.books.map(book => (
						<li
							key={book.id}
							onClick={() => setBookId(book.id)}
						>
							{book.name}
						</li>
					))
				) : (
					<li>No books in database</li>
				)}
			</ul>
			<BookDetails id={bookId} />
		</div>
	)
}

export default BookList
