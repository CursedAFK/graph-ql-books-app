import { PropTypes } from 'prop-types'
import { useQuery } from '@apollo/client'
import QUERIES from '../queries/queries'

const BookDetails = ({ id }) => {
	const { data, loading } = useQuery(QUERIES.GET_BOOK, {
		variables: {
			id
		}
	})

	return (
		<div id='book-details'>
			{loading ? (
				<p>Loading ...</p>
			) : !data ? (
				<p>Select a book to view details</p>
			) : (
				<div>
					<h2>{data.book.name}</h2>
					<p>{data.book.genre}</p>
					<p>{data.book.author.name}</p>
					<p>All books by this author: </p>
					<ul className='other-books'>
						{data.book.author.books.map(book => (
							<li key={book.id}>{book.name}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

BookDetails.propTypes = {
	id: PropTypes.string.isRequired
}

export default BookDetails
