'use client'

import { CitiesList } from '@/components/CitiesList'
import { Header } from '@/components/Header'
import { setInitCities } from '@/store/slices/citiesSlice'
import { AppDispatch, RootState } from '@/store/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
	const dispatch = useDispatch<AppDispatch>()
	const selectedCities = useSelector(
		(state: RootState) => state.cities.selectedCities
	)

	useEffect(() => {
		const savedCities = localStorage.getItem('selectedCities')
		if (savedCities) {
			const citiesData = JSON.parse(savedCities)
			dispatch(setInitCities(citiesData))
		}
	}, [dispatch])

	return (
		<div>
			<Header isHome={true} />
			{selectedCities.length == 0 ? (
				<p className="loading-text">No cities to display...</p>
			) : (
				<CitiesList cities={selectedCities} />
			)}
		</div>
	)
}
