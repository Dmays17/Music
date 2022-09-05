import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
//import { Fragment } from 'react/cjs/react.production.min'

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])

	const API_URL = 'https://itunes.apple.com/search?term='

	useEffect(() => {
        console.log('User effect happening!!')
		if(search) {
            console.log('searchsss in use effect about to fetch', search)
			const fetchData = async () => {
				document.title = `${search} Music`
				const response = await fetch(API_URL + search)
				const resData = await response.json()
				if (resData.results.length > 0) {
					return setData(resData.results)
				} else {
					return setMessage('Not Found')
				}
			}
			fetchData()
		}
	}, [search])
	
	const handleSearch = (e, term) => {
		e.preventDefault()
        console.log('Handle serach happening!!', term)
		setSearch(term)
	}

    console.log('this is our state!!!', data)
	return (
		<div>
			{message}
			<Router>
				<Routes>
					<Route path="/" element={
						// <Fragment>
                        <div>
							<SearchBar handleSearch={handleSearch}/>
							<Gallery data={data} />
                            </div>
						// </Fragment>
					} />
					<Route path="/album/:id" element={<AlbumView />} />
					<Route path="/artist/:id" element={<ArtistView />} />
				</Routes>
			</Router>
		</div>
  	);
}

export default App;
