#!/usr/bin/env python3
"""
REACT THREE.JS 3D GAME TESTING START SCRIPT
Usage: python start_tester.py [--url URL] [--headless]
"""

import sys
import argparse
from datetime import datetime

# Standard URL
DEFAULT_URL = "https://huggingface.co/spaces/Wrzzzrzr/corona-control-ultimate"

def main():
    parser = argparse.ArgumentParser(description="React Three.js 3D Game Tester")
    parser.add_argument("--url", default=DEFAULT_URL, help="Game URL to test")
    parser.add_argument("--headless", action="store_true", help="Run in headless mode (no visible browser)")
    parser.add_argument("--quick", action="store_true", help="Quick mode (skip some long tests)")
    parser.add_argument("--browser", help="Path to browser executable (e.g. Brave binary)")
    parser.add_argument("--profile", help="Path to user data directory (profile) to keep login")
    
    args = parser.parse_args()
    
    print("\n" + "="*60)
    print("REACT THREE.JS 3D GAME TESTING FRAMEWORK")
    print("="*60)
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Target URL: {args.url}")
    print(f"Mode: {'Headless' if args.headless else 'Visible'}")
    print("="*60 + "\n")
    
    try:
        # Import Tester Module
        from react_threejs_tester import ReactThreeJS_Tester
        
        # Initialize Tester
        tester = ReactThreeJS_Tester(args.url, headless=args.headless, browser_path=args.browser, user_data_dir=args.profile)
        
        # Run Tests
        success = tester.run_comprehensive_test()
        
        if success:
            print("\n" + "="*60)
            print("SUCCESS: All tests completed without critical errors.")
            print("="*60)
            return 0
        else:
            print("\n" + "="*60)
            print("WARNING: Tests completed with issues.")
            print("="*60)
            return 1
            
    except ImportError as e:
        print(f"\nCRITICAL IMPORT ERROR: {str(e)}")
        print("Please install requirements: pip install -r requirements.txt")
        return 1
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"\nFATAL ERROR: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
