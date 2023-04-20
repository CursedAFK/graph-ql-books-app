import {
	GraphQLID,
	GraphQLInt,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} from 'graphql'
import Book from '../models/book.js'
import Author from '../models/author.js'

// const monPass = 'X4YJjX6Tlaw4vonN'

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		author: {
			type: AuthorType,
			resolve: (parent, args) => {
				return Author.findById(parent.authorId)
			}
		},
		name: {
			type: GraphQLString
		},
		genre: {
			type: GraphQLString
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		},
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => {
				return Book.find({ authorId: parent.id })
			}
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve: (parent, args) => {
				return Book.findById(args.id)
			}
		},
		author: {
			type: AuthorType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve: (parent, args) => {
				return Author.findById(args.id)
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve: () => {
				return Book.find({})
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve: () => {
				return Author.find({})
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				age: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve: (parent, args) => {
				const author = new Author({
					name: args.name,
					age: args.age
				})
				return author.save()
			}
		},
		addBook: {
			type: BookType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				genre: {
					type: new GraphQLNonNull(GraphQLString)
				},
				authorId: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (parent, args) => {
				const book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				})
				return book.save()
			}
		}
	}
})

export default new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
