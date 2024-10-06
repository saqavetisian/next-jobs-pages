import '@testing-library/jest-dom';
import {render, screen, fireEvent, within} from '@testing-library/react';
import List from '@/components/job/List';
import MainContext from '@/contexts/MainContext';
import TabsContext from '@/contexts/TabsContext';

// Mock dependencies
jest.mock('@/components/job/Loading');
jest.mock('@/components/job/Empty', () => {
  const MockEmpty = () => <div>No jobs available</div>;
  MockEmpty.displayName = 'Empty';
  return MockEmpty;
});
jest.mock('@/components/job/Card', () => {
  const MockCard = ({ isBookmarked, job }) => (
    <div>
      <p>{job.title}</p>
      <button>{isBookmarked ? 'save' : 'remove'}</button>
    </div>
  );

  // Set the display name for the component
  MockCard.displayName = 'Card';

  return MockCard;
});
jest.mock('@/components/ui/Button', () => {
  const MockButton = ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  );

  // Set the display name for the component
  MockButton.displayName = 'Button';

  return MockButton;
});

jest.mock('@/components/ui/TracingBeam', () => {
  const MockTracingBeam = ({ children }) => <div>{children}</div>;

  // Set the display name for the component
  MockTracingBeam.displayName = 'TracingBeam';

  return MockTracingBeam;
});

describe('List Component', () => {
  const mockJobs = [
    { id: '1', title: 'React Developer' },
    { id: '2', title: 'Backend Developer' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockMainContext = {
    isLoading: false,
    data: {
      jobs: mockJobs,
      total: 5,
    },
    setQueryParams: jest.fn(),
  };

  const mockTabsContext = {
    activeTab: '1',
    setActiveTab: jest.fn(),
  };

  it('renders loading state', () => {
    render(
      <MainContext.Provider value={{ ...mockMainContext, isLoading: true }}>
        <TabsContext.Provider value={mockTabsContext}>
          <List />
        </TabsContext.Provider>
      </MainContext.Provider>
    );

    expect(screen.getByText('loading ...')).toBeInTheDocument();
  });

  it('renders jobs and handles "load more"', async () => {
    render(
      <MainContext.Provider value={mockMainContext}>
        <TabsContext.Provider value={mockTabsContext}>
          <List />
        </TabsContext.Provider>
      </MainContext.Provider>
    );

    // Check that the jobs are rendered
    expect(screen.getByText('React Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();

    // Check "Load More" button functionality
    const loadMoreButton = screen.getByText('load more');
    fireEvent.click(loadMoreButton);
    expect(mockMainContext.setQueryParams).toHaveBeenCalledWith({ page: 2 });
  });

  it('renders empty state when no jobs are available', () => {
    render(
      <MainContext.Provider
        value={{
          ...mockMainContext,
          data: { jobs: [], total: 0 },
        }}
      >
        <TabsContext.Provider value={mockTabsContext}>
          <List />
        </TabsContext.Provider>
      </MainContext.Provider>
    );

    expect(screen.getByText('No jobs available')).toBeInTheDocument();
  });

  it('renders bookmarked jobs when active tab is "2"', () => {
    render(
      <MainContext.Provider value={mockMainContext}>
        <TabsContext.Provider value={{ ...mockTabsContext, activeTab: '2' }}>
          <List />
        </TabsContext.Provider>
      </MainContext.Provider>
    );

    const container = screen.getByText(/bookmarked/i).closest('p');
    expect(within(container).getByText('0')).toBeInTheDocument();
  });
});
