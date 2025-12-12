import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Listing } from '@/lib/types';

interface MapboxMapProps {
  listings?: Listing[];
  center?: [number, number];
  onLocationSelect?: (lat: number, lng: number) => void;
  selectable?: boolean;
  className?: string;
  accessToken?: string;
}

export default function MapboxMap({
  listings = [],
  center = [77.5946, 12.9716], // Default to Bangalore
  onLocationSelect,
  selectable = false,
  className = 'h-[400px]',
  accessToken,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [token, setToken] = useState(accessToken || '');
  const [isMapReady, setIsMapReady] = useState(!!accessToken);

  useEffect(() => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: center,
        zoom: 12,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for listings
      listings.forEach((listing) => {
        const el = document.createElement('div');
        el.className = 'w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg cursor-pointer';
        el.innerHTML = '💊';

        new mapboxgl.Marker(el)
          .setLngLat([listing.location_lng, listing.location_lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div class="p-2">
                <strong>${listing.medicine_name}</strong>
                <p class="text-sm">₹${listing.selling_price}</p>
              </div>`
            )
          )
          .addTo(map.current!);
      });

      // Selectable mode for listing form
      if (selectable && onLocationSelect) {
        marker.current = new mapboxgl.Marker({ draggable: true, color: '#0d9488' })
          .setLngLat(center)
          .addTo(map.current);

        onLocationSelect(center[1], center[0]);

        marker.current.on('dragend', () => {
          const lngLat = marker.current!.getLngLat();
          onLocationSelect(lngLat.lat, lngLat.lng);
        });

        map.current.on('click', (e) => {
          marker.current!.setLngLat([e.lngLat.lng, e.lngLat.lat]);
          onLocationSelect(e.lngLat.lat, e.lngLat.lng);
        });
      }

      setIsMapReady(true);
    } catch (error) {
      console.error('Map initialization error:', error);
      setIsMapReady(false);
    }

    return () => {
      map.current?.remove();
    };
  }, [token, listings, center, selectable, onLocationSelect]);

  if (!token) {
    return (
      <div className={`${className} border rounded-lg p-6 bg-muted/50 flex flex-col items-center justify-center`}>
        <Label htmlFor="mapbox-token" className="mb-2 text-center">
          Enter your Mapbox public token to enable maps
        </Label>
        <Input
          id="mapbox-token"
          type="text"
          placeholder="pk.eyJ1IjoiLi4uIiwiYSI6Ii4uLiJ9..."
          className="max-w-md mb-2"
          onChange={(e) => setToken(e.target.value)}
        />
        <p className="text-xs text-muted-foreground text-center">
          Get your free token at{' '}
          <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            mapbox.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={`${className} rounded-lg overflow-hidden shadow-card`}>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
