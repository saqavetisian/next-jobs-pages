import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../pages/index';
import useSWR from 'swr';
import { toast } from 'react-toastify';

// Mock SWR and Toastify dependencies
jest.mock('swr');
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
  ToastContainer: () => <div>ToastContainer</div>,
}));

describe('Home', () => {
  const mockApi1Data = {
    total: 2,
    jobs: [{ id: 1, title: 'React Developer' }, { id: 2, title: 'Full-Stack Engineer' }],
  };

  const mockApi2Data = {
    total: 2,
    jobs: [{ id: 3, title: 'Backend Developer' }, { id: 4, title: 'Frontend Developer' }],
  };

  const mockErrorApi3 = {
    error: true,
    message: 'OOps, data is not available',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe() {}
    };
  });

  it('should render the component and display jobs when data is available', async () => {
    // Mock SWR to return the API responses
    (useSWR as jest.Mock)
      .mockReturnValueOnce({ data: mockApi1Data, error: null, isLoading: false }) // API 1
      .mockReturnValueOnce({ data: mockApi2Data, error: null, isLoading: false }) // API 2
      .mockReturnValueOnce({ data: mockErrorApi3, error: null, isLoading: false }); // API 3

    render(<Home />);

    // Ensure the main elements render
    // expect(screen.getByText('Job search aggregator')).toBeInTheDocument();

    // Wait for jobs to appear
    await waitFor(() => {
      expect(screen.getByText('React Developer')).toBeInTheDocument();
      expect(screen.getByText('Backend Developer')).toBeInTheDocument();
    });
  });

  it('should show an error toast when API 2 returns an error', async () => {
    // Mock SWR to simulate an error from API 2
    (useSWR as jest.Mock)
      .mockReturnValueOnce({ data: mockApi1Data, error: null, isLoading: false }) // API 1
      .mockReturnValueOnce({ data: null, error: null, isLoading: false }) // API 3
      .mockReturnValueOnce({ data: mockErrorApi3, error: null, isLoading: false }); // API 2 error

    render(<Home />);

    // Ensure the toast error is shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('OOps, data is not available');
      expect(screen.getByText('ToastContainer')).toBeInTheDocument();
    });
  });

  it('should show loading indicators when data is being fetched', async () => {
    // Mock SWR to simulate loading state
    (useSWR as jest.Mock)
      .mockReturnValueOnce({ data: null, error: null, isLoading: true }) // API 1
      .mockReturnValueOnce({ data: null, error: null, isLoading: true }) // API 2
      .mockReturnValueOnce({ data: null, error: null, isLoading: true }); // API 3

    render(<Home />);

    // Check if the loading state renders appropriately
    await waitFor(() => {
      // You can define a loading indicator in the List or Filter components and check for its presence
      // For now, we'll assume it's some "Loading..." text
      expect(screen.getByText('loading ...')).toBeInTheDocument();
    });
  });

  it('should render no jobs when there is no data and no errors', async () => {
    // Mock SWR to return no jobs
    (useSWR as jest.Mock)
      .mockReturnValueOnce({ data: { total: 0, jobs: [] }, error: null, isLoading: false }) // API 1
      .mockReturnValueOnce({ data: { total: 0, jobs: [] }, error: null, isLoading: false }) // API 2
      .mockReturnValueOnce({ data: null, error: null, isLoading: false }); // API 3

    render(<Home />);

    // Check that no jobs are rendered
    await waitFor(() => {
      expect(screen.queryByText('No Data Found')).toBeInTheDocument();
    });
  });
});
