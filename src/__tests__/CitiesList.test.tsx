import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import citiesSlice from '@/store/slices/citiesSlice'
import { CitiesList } from '@/components/CitiesList'
import { CITIES } from '@/shared/data/cities.data'
import { WeatherCard } from '@/components/WeatherCard'

jest.mock('next/navigation', () => require('next-router-mock'))
jest.mock('@/components/WeatherCard', () => ({
	WeatherCard: ({ city }: { city: (typeof CITIES)[0] }) => (
		<div data-testid="weather-card">{city.name}</div>
	)
}))

describe('CitiesList', () => {
	it('renders all cities', () => {
		const store = configureStore({
			reducer: { cities: citiesSlice.reducer }
		})

		render(
			<Provider store={store}>
				<CitiesList cities={CITIES} />
			</Provider>
		)

		const cards = screen.getAllByTestId('weather-card')
		expect(cards).toHaveLength(CITIES.length)

		CITIES.forEach((city) => {
			expect(screen.getByText(city.name)).toBeInTheDocument()
		})
	})
})
