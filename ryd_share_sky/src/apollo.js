import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { resolvers, defaults } from './resolvers'

const typeDefs = `

	type Registration {
		showRegistration: Boolean!
	}

	type Item {
		showItem: String!
	}

	type Mutation {
		toggleRegistration(showRegistration: Boolean!): Registration
		toggleItem(showItem: String!): Item
	}

	type Query {
		showRegistration: Registration
		showItem: Item
	}
`

const httpLink = new HttpLink({
	uri: 'https://iterport-ground-prod.herokuapp.com/'
})

const cache = new InMemoryCache()
const stateLink = withClientState({
	cache,
	resolvers,
	defaults,
	typeDefs
})

const middlewareLink = new ApolloLink((op, fo) => {
	const token = JSON.parse(localStorage.getItem('_x'))
	const authorization = token ? `Bearer ${token}` : ''
	op.setContext({
		headers: {
			authorization
		}
	})
	return fo(op)
})

const link = ApolloLink.from([stateLink, middlewareLink, httpLink])
const client = new ApolloClient({
	link,
	cache,
	connectToDevTools: true
})

export default client
