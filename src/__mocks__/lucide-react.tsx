'use client';
import React from 'react';

// This is a generic mock for all lucide-react icons.
// It renders a simple div with a data-testid to identify it in tests.
const LucideIconMock = ({ name, ...props }: { name: string, [key: string]: any }) => {
  return <div data-testid={`lucide-icon-mock-${name}`} {...props} />;
};

// Use a Proxy to catch all named exports from 'lucide-react'
// and return our mock component instead.
const handler = {
  get: function(target: any, prop: string) {
    // Return a component that includes the icon's name for easier debugging
    return (props: any) => <LucideIconMock name={prop} {...props} />;
  }
};

module.exports = new Proxy({}, handler);
