import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import citiesSlice from '@/store/slices/citiesSlice'
import { WeatherCard } from '@/components/WeatherCard'
import { CITIES } from '@/shared/data/cities.data'

jest.mock('next/navigation', () => require('next-router-mock'))

beforeAll(() => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () =>
				Promise.resolve({ current: { temp: 20, feels_like: 18 } })
		})
	) as jest.Mock
})

describe('WeatherCard', () => {
	it('renders a heading', async () => {
		const store = configureStore({
			reducer: { cities: citiesSlice.reducer }
		})

		render(
			<Provider store={store}>
				<WeatherCard city={CITIES[0]} />
			</Provider>
		)

		const heading = await screen.findByRole('heading', { level: 2 })
		expect(heading).toBeInTheDocument()
	})
})
