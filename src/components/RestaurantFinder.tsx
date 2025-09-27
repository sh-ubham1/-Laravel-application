import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, Loader2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Restaurant {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  photos?: Array<{ photo_reference: string }>;
}

const RestaurantFinder = () => {
  const [city, setCity] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const searchRestaurants = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!city.trim()) {
      toast({
        title: "City Required",
        description: "Please enter a city name to search for restaurants.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      // For demo purposes, we'll simulate the Google Places API
      // In production, you'd need to set up a backend to handle the API key securely
      await simulateApiCall();
      
      // Mock restaurant data for demonstration
      const mockRestaurants: Restaurant[] = [
        {
          place_id: '1',
          name: 'The Golden Spoon',
          formatted_address: `123 Main St, ${city}`,
          rating: 4.5,
          user_ratings_total: 127,
          price_level: 2,
        },
        {
          place_id: '2',
          name: 'Bella Vista Italian',
          formatted_address: `456 Oak Ave, ${city}`,
          rating: 4.2,
          user_ratings_total: 89,
          price_level: 3,
        },
        {
          place_id: '3',
          name: 'Street Tacos & More',
          formatted_address: `789 Pine St, ${city}`,
          rating: 4.7,
          user_ratings_total: 234,
          price_level: 1,
        },
        {
          place_id: '4',
          name: 'The Cozy Corner Cafe',
          formatted_address: `321 Elm St, ${city}`,
          rating: 4.3,
          user_ratings_total: 156,
          price_level: 2,
        },
        {
          place_id: '5',
          name: 'Dragon Palace Chinese',
          formatted_address: `654 Maple Dr, ${city}`,
          rating: 4.1,
          user_ratings_total: 92,
          price_level: 2,
        },
        {
          place_id: '6',
          name: 'The Rustic Grill',
          formatted_address: `987 Cedar Ln, ${city}`,
          rating: 4.6,
          user_ratings_total: 178,
          price_level: 3,
        },
        {
          place_id: '7',
          name: 'Sushi Zen',
          formatted_address: `246 Birch Rd, ${city}`,
          rating: 4.4,
          user_ratings_total: 203,
          price_level: 3,
        },
        {
          place_id: '8',
          name: 'Mom\'s Home Cooking',
          formatted_address: `135 Walnut St, ${city}`,
          rating: 4.8,
          user_ratings_total: 312,
          price_level: 1,
        },
        {
          place_id: '9',
          name: 'The Steakhouse Prime',
          formatted_address: `468 Cherry Ave, ${city}`,
          rating: 4.2,
          user_ratings_total: 145,
          price_level: 4,
        },
        {
          place_id: '10',
          name: 'Pizzeria Napoletana',
          formatted_address: `579 Spruce Blvd, ${city}`,
          rating: 4.5,
          user_ratings_total: 267,
          price_level: 2,
        },
      ];

      setRestaurants(mockRestaurants);
      
      toast({
        title: "Restaurants Found!",
        description: `Found ${mockRestaurants.length} restaurants in ${city}`,
      });
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      toast({
        title: "Search Failed",
        description: "Unable to fetch restaurants. Please try again.",
        variant: "destructive",
      });
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const simulateApiCall = () => {
    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-restaurant-warning text-restaurant-warning" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-restaurant-warning/50 text-restaurant-warning" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-muted-foreground" />
        );
      }
    }

    return stars;
  };

  const getPriceLevel = (level?: number) => {
    if (!level) return 'N/A';
    return '$'.repeat(level);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-restaurant-surface to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-restaurant-accent bg-clip-text text-transparent mb-4">
            Restaurant Finder
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing restaurants in any city using Google Maps Places API
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={searchRestaurants} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter city name (e.g., New York, Paris, Tokyo)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-12 pr-4 py-6 text-lg bg-card border-primary/20 focus:border-primary transition-colors"
                disabled={loading}
              />
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-lg bg-gradient-to-r from-primary to-restaurant-accent hover:opacity-90 transition-opacity"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Searching Restaurants...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Find Restaurants
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="max-w-4xl mx-auto">
            {restaurants.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  Restaurants in <span className="text-primary">{city}</span>
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {restaurants.map((restaurant) => (
                    <Card
                      key={restaurant.place_id}
                      className="hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur border-primary/10 hover:border-primary/30"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-start justify-between">
                          <span className="text-lg font-semibold text-foreground">
                            {restaurant.name}
                          </span>
                          <span className="text-sm font-medium text-restaurant-warning">
                            {getPriceLevel(restaurant.price_level)}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-sm">{restaurant.formatted_address}</span>
                        </div>
                        
                        {restaurant.rating && (
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {renderStars(restaurant.rating)}
                            </div>
                            <span className="text-sm font-medium">
                              {restaurant.rating}
                            </span>
                            {restaurant.user_ratings_total && (
                              <span className="text-sm text-muted-foreground">
                                ({restaurant.user_ratings_total} reviews)
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : !loading && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No Restaurants Found</h3>
                <p className="text-muted-foreground">
                  Try searching for a different city or check your spelling.
                </p>
              </div>
            )}
          </div>
        )}

        {/* API Note */}
        <div className="max-w-4xl mx-auto mt-16 p-6 bg-muted/50 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Google Maps API Integration Note
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            This demo uses mock data for display purposes. To use with real Google Maps Places API:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Get a Google Maps API key from Google Cloud Console</li>
            <li>Enable the Places API for your project</li>
            <li>Set up a backend endpoint to handle API calls securely</li>
            <li>Replace the mock data with actual API responses</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantFinder;