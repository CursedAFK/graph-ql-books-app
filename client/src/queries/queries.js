import { gql } from '@apollo/client'

const QUERIES = {
	GET_AUTHORS: gql`
		query GetAuthors {
			authors {
				name
				id
			}
		}
	`,
	GET_BOOKS: gql`
		query GetBooks {
			books {
				name
				id
			}
		}
	`,
	ADD_BOOK: gql`
		mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
			addBook(name: $name, genre: $genre, authorId: $authorId) {
				name
				id
			}
		}
	`,
	GET_BOOK: gql`
		query GetBook($id: ID!) {
			book(id: $id) {
				id
				name
				genre
				author {
					id
					name
					age
					books {
						name
						id
					}
				}
			}
		}
	`
}

export default QUERIES
