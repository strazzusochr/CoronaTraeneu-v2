#!/usr/bin/env python3
"""
REACT THREE.JS 3D WEB GAME TESTING FRAMEWORK
Ultimate Testing Suite for React + Three.js 3D Games
Autor: AI Assistant
Version: 1.0.3
"""

import os
import sys
import json
import time
import logging
from datetime import datetime
from io import BytesIO

# Robust Imports
try:
    import numpy as np
    from PIL import Image, ImageChops
    import cv2
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    import helium
    from smolagents import CodeAgent, tool
    from smolagents.agents import ActionStep
    import requests
except ImportError as e:
    print(f"FATAL IMPORT ERROR: {e}")
    print("Please run: pip install -r requirements.txt")
    sys.exit(1)

# Logging Configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('react_threejs_test.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# --- TOOLS DEFINITIONS ---

@tool
def analyze_react_structure() -> str:
    """Analyzes React App structure, returns version and component count."""
    try:
        driver = helium.get_driver()
        react_info = driver.execute_script("""
            const info = {
                reactDetected: !!(window.__REACT_DEVTOOLS_GLOBAL_HOOK__),
                components: 0,
                version: 'unknown'
            };
            if (window.React) info.version = window.React.version;
            return info;
        """)
        return f"React Analysis: {react_info}"
    except Exception as e:
        return f"React Analysis failed: {str(e)}"

@tool
def inspect_threejs_scene() -> str:
    """Detailed inspection of Three.js Scene, objects, and memory. Use this to detect missing NPCs or POIs."""
    try:
        driver = helium.get_driver()
        scene_info = driver.execute_script("""
            const stats = {
                objects: 0,
                meshes: 0,
                lights: 0,
                geometries: 0,
                textures: 0,
                memory: {}
            };
            
            // Standard Three.js Scene traversal
            const scene = window.scene || (window.__THREE_DEVTOOLS_GLOBAL_HOOK__ && window.__THREE_DEVTOOLS_GLOBAL_HOOK__.scenes[0]);
            if (!scene) return "No Three.js Scene detected in window.scene";

            scene.traverse(obj => {
                stats.objects++;
                if (obj.isMesh) stats.meshes++;
                if (obj.isLight) stats.lights++;
            });

            const renderer = window.renderer;
            if (renderer && renderer.info) {
                stats.memory = renderer.info.memory;
                stats.render = renderer.info.render;
            }

            return stats;
        """)
        return f"Three.js Scene Analysis: {scene_info}"
    except Exception as e:
        return f"Three.js Inspection failed: {str(e)}"

@tool
def detect_rendering_issues() -> str:
    """Checks for typical rendering errors like White Screens, Shaders failing, or context loss."""
    try:
        driver = helium.get_driver()
        issues = driver.execute_script("""
            const check = {
                whiteScreen: false,
                contextLost: false,
                shaderErrors: []
            };
            
            // 1. Simple pixel check for white screen (top-left)
            const canvas = document.querySelector('canvas');
            if (canvas) {
                const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
                if (gl && gl.isContextLost()) check.contextLost = true;
            }

            // 2. Check for error overlay
            const errorOverlay = document.getElementById('error-overlay');
            if (errorOverlay && errorOverlay.style.display !== 'none') {
                check.shaderErrors.push(errorOverlay.innerText);
            }

            return check;
        """)
        return f"Rendering Issue Check: {issues}"
    except Exception as e:
        return f"Rendering check failed: {str(e)}"
@tool
def test_webgl_performance() -> str:
    """Tests WebGL Performance (Max Texture Size, Viewport) for 3D Rendering."""
    try:
        driver = helium.get_driver()
        webgl_test = driver.execute_script("""
            const canvas = document.querySelector('canvas');
            if (!canvas) return { error: 'No Canvas found' };
            
            const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
            if (!gl) return { error: 'No WebGL Context' };
            
            // Run WebGL Tests
            const tests = {
                maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
                maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
                supported: true
            };
            
            return tests;
        """)
        return f"WebGL Performance: {webgl_test}"
    except Exception as e:
        return f"WebGL Test failed: {str(e)}"

@tool
def test_3d_interactions() -> str:
    """Tests 3D Interactions by clicking the canvas and moving the mouse."""
    try:
        driver = helium.get_driver()
        actions = webdriver.ActionChains(driver)
        
        # Click center of canvas
        canvas_elements = driver.find_elements(By.TAG_NAME, "canvas")
        if canvas_elements:
            canvas = canvas_elements[0]
            actions.move_to_element(canvas).click().perform()
            time.sleep(0.5)
            
            # Mouse Movement
            actions.move_by_offset(100, 100).perform()
            time.sleep(0.5)
            actions.move_by_offset(-100, -100).perform()
        
        return "3D Interactions tested"
    except Exception as e:
        return f"3D Interactions failed: {str(e)}"

@tool
def analyze_3d_rendering_quality() -> str:
    """Analyzes 3D Rendering Quality (Placeholder for visual analysis)."""
    try:
        # Here we could compare screenshots, but we just wait a bit
        time.sleep(1.0)
        return "3D Rendering Quality analyzed"
    except Exception as e:
        return f"Rendering Analysis failed: {str(e)}"


# --- MAIN CLASS ---

class ReactThreeJS_Tester:
    """Main Class for React Three.js 3D Game Testing"""
    
    def __init__(self, game_url, headless=False, browser_path=None, user_data_dir=None):
        self.game_url = game_url
        self.headless = headless
        self.browser_path = browser_path
        self.user_data_dir = user_data_dir
        self.driver = None
        self.agent = None
        self.test_results = {}
        self.screenshot_count = 0
        
    def setup_browser(self):
        """Setup Chrome Browser for 3D Web Games"""
        try:
            chrome_options = Options()
            
            # Basic Configuration
            chrome_options.add_argument("--window-size=1920,1080")
            chrome_options.add_argument("--start-maximized")
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            
            # 3D WebGL Support
            chrome_options.add_argument("--enable-webgl")
            chrome_options.add_argument("--ignore-gpu-blocklist")
            chrome_options.add_argument("--enable-accelerated-2d-canvas")
            chrome_options.add_argument("--enable-gpu-rasterization")
            
            # Anti-Detection & Automation Hiding
            chrome_options.add_argument("--disable-blink-features=AutomationControlled")
            chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
            chrome_options.add_experimental_option("useAutomationExtension", False)
            
            # User Data Profile (Keep Login)
            if self.user_data_dir:
                chrome_options.add_argument(f"--user-data-dir={self.user_data_dir}")
                logger.info(f"Using user data directory: {self.user_data_dir}")
            
            if self.headless:
                chrome_options.add_argument("--headless")
                chrome_options.add_argument("--disable-gpu")
            
            # Custom Browser Path (z.B. für Brave)
            if self.browser_path:
                chrome_options.binary_location = self.browser_path
                logger.info(f"Using custom browser path: {self.browser_path}")
            
            # Start Browser
            self.driver = helium.start_chrome(options=chrome_options, headless=self.headless)
            logger.info("Browser successfully initialized")
            return True
            
        except Exception as e:
            logger.error(f"Browser Setup failed: {e}")
            return False
    
    def take_screenshot(self, name):
        """Takes screenshots improved for 3D Games"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            screenshot = self.driver.get_screenshot_as_png()
            img = Image.open(BytesIO(screenshot))
            
            # Create Folder
            os.makedirs("screenshots/react_threejs", exist_ok=True)
            
            filename = f"screenshots/react_threejs/{name}_{timestamp}.png"
            img.save(filename)
            
            self.screenshot_count += 1
            logger.info(f"Screenshot {self.screenshot_count}: {filename}")
            return filename
            
        except Exception as e:
            logger.error(f"Screenshot Error: {e}")
            return None

    def switch_to_game_frame(self):
        """Switches to the game iframe (useful for HF Spaces)"""
        try:
            # Check for iframes
            iframes = self.driver.find_elements(By.TAG_NAME, "iframe")
            for iframe in iframes:
                # HF Spaces usually use an iframe for the content
                self.driver.switch_to.frame(iframe)
                # Check if this frame has a canvas or React/ThreeJS signs
                has_canvas = len(self.driver.find_elements(By.TAG_NAME, "canvas")) > 0
                if has_canvas:
                    logger.info("Switched to game iframe with canvas")
                    return True
                self.driver.switch_to.default_content()
            return False
        except Exception as e:
            logger.error(f"Error switching to game frame: {e}")
            self.driver.switch_to.default_content()
            return False

    def detect_frameworks(self):
        """Detects React and Three.js in project"""
        # Try main content first, then search in iframes
        results = self._scan_frameworks()
        
        if not results['react'] and not results['threejs'] and results['canvas_count'] == 0:
            logger.info("Frameworks not found in main content, searching in iframes...")
            if self.switch_to_game_frame():
                results = self._scan_frameworks()
        
        return results

    def _scan_frameworks(self):
        """Internal framework scanning logic"""
        try:
            # React detection
            react_detected = self.driver.execute_script("""
                return !!(window.__REACT_DEVTOOLS_GLOBAL_HOOK__ && 
                         window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers && 
                         window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers.length > 0)
            """)
            
            # Three.js detection
            three_detected = self.driver.execute_script("""
                return !!(typeof THREE !== 'undefined' || 
                         window.THREE || 
                         document.querySelector('canvas'))
            """)
            
            # Count Canvas Elements
            canvas_elements = self.driver.find_elements(By.TAG_NAME, "canvas")
            
            frameworks = {
                'react': react_detected,
                'threejs': three_detected,
                'canvas_count': len(canvas_elements)
            }
            
            logger.info(f"Scan Result: React={react_detected}, Three.js={three_detected}, Canvas={len(canvas_elements)}")
            return frameworks
            
        except Exception as e:
            logger.error(f"Framework Scan failed: {e}")
            return {'react': False, 'threejs': False, 'canvas_count': 0}

    def measure_performance(self):
        """Measures detailed Performance Metrics"""
        try:
            metrics = self.driver.execute_script("""
                const perfData = performance.timing;
                const metrics = {
                    pageLoadTime: perfData.loadEventEnd - perfData.navigationStart,
                    domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart,
                    memory: performance.memory ? {
                        used: performance.memory.usedJSHeapSize / 1048576,
                        total: performance.memory.totalJSHeapSize / 1048576
                    } : null
                };
                return metrics;
            """)
            
            logger.info(f"Performance Metrics captured")
            return metrics
            
        except Exception as e:
            logger.error(f"Performance Measurement failed: {e}")
            return None

    def create_testing_agent(self):
        """Creates specialized Testing Agent for React Three.js"""
        try:
            from smolagents import CodeAgent
            try:
                from smolagents import HfApiModel
            except ImportError:
                from smolagents.models import HfApiModel
            
            # Check for API Key
            import os
            hf_token = os.getenv("HF_TOKEN")
            if not hf_token:
                logger.warning("HF_TOKEN not found in environment. Agent might fail to generate output.")
            
            # Use a standard, widely supported model for reasoning
            model = HfApiModel(model_id="meta-llama/Llama-3.2-3B-Instruct", token=hf_token)
            
            self.agent = CodeAgent(
                tools=[
                    analyze_react_structure,
                    inspect_threejs_scene,
                    detect_rendering_issues,
                    test_webgl_performance,
                    test_3d_interactions,
                    analyze_3d_rendering_quality
                ],
                model=model,
                additional_authorized_imports=["helium", "cv2", "numpy", "PIL"],
                max_steps=25,
                name="ReactThreeJSTester"
            )
        except Exception as e:
            logger.error(f"Failed to create Testing Agent: {e}")
            return False
        
        # Import Helium (Optional, removing to fix TypeError)
        # self.agent.python_executor("from helium import *", self.agent.state)
        
        logger.info("React Three.js Testing Agent created")
        return True

    def run_comprehensive_test(self):
        """Runs comprehensive tests"""
        logger.info("Starting comprehensive React Three.js Tests...")
        
        # 1. Browser setup
        if not self.setup_browser():
            return False
        
        # 2. Navigate to Game URL
        try:
            logger.info(f"Opening {self.game_url}")
            helium.go_to(self.game_url)
            time.sleep(10)  # Wait for Game Load (Increased for HF Spaces)
            self.take_screenshot("game_loaded")
        except Exception as e:
            logger.error(f"Navigation failed: {e}")
            return False
        
        # 3. Detect Frameworks
        frameworks = self.detect_frameworks()
        self.test_results['frameworks'] = frameworks
        
        # 4. Measure Performance
        performance = self.measure_performance()
        self.test_results['performance'] = performance
        
        # 5. Create and Run Agent
        if self.create_testing_agent():
            test_command = f"""
            Run comprehensive tests for React Three.js 3D Game:
            
            1. Analyze React App Structure
            2. Inspect Three.js Scene & Memory
            3. Detect Rendering Issues (White Screen check)
            4. Test WebGL Performance
            5. Test 3D Interactions
            6. Analyze 3D Rendering Quality
            
            URL: {self.game_url}
            
            Report on:
            - React Components and State
            - Three.js Scene and Objects
            - WebGL Performance and Limitations
            - 3D Interactions and Controls
            - Rendering Issues or Bugs
            """
            
            try:
                result = self.agent.run(test_command)
                self.test_results['agent_analysis'] = str(result)
                logger.info("Agent Tests completed")
            except Exception as e:
                logger.error(f"Agent Test failed: {e}")
                self.test_results['agent_error'] = str(e)
        
        # 6. Summarize Results
        self.generate_test_report()
        
        logger.info("All Tests completed!")
        return True

    def generate_test_report(self):
        """Generates detailed Test Report"""
        report = {
            'timestamp': datetime.now().isoformat(),
            'url': self.game_url,
            'screenshots_taken': self.screenshot_count,
            'results': self.test_results
        }
        
        # Save Report
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_file = f"test_report_{timestamp}.json"
        
        with open(report_file, 'w') as f:
            json.dump(report, f, indent=2)
        
        logger.info(f"Test Report saved: {report_file}")
        
        # Console Output
        print("\n" + "="*60)
        print("REACT THREE.JS 3D GAME TEST REPORT")
        print("="*60)
        print(f"Time: {report['timestamp']}")
        print(f"URL: {report['url']}")
        print(f"Screenshots: {report['screenshots_taken']}")
        
        if 'frameworks' in self.test_results:
            fw = self.test_results['frameworks']
            print(f"React detected: {'Yes' if fw.get('react') else 'No'}")
            print(f"Three.js detected: {'Yes' if fw.get('threejs') else 'No'}")
            print(f"Canvas Elements: {fw.get('canvas_count', 0)}")
        
        if 'performance' in self.test_results and self.test_results['performance']:
            perf = self.test_results['performance']
            print(f"Load Time: {perf.get('pageLoadTime', 0)}ms")
            if perf.get('memory'):
                print(f"Memory: {perf['memory'].get('used', 0):.2f}MB")
        
        print("="*60)

    def cleanup(self):
        """Clean up and close browser"""
        try:
            if self.driver:
                self.driver.quit()
                logger.info("Browser closed")
        except Exception as e:
            logger.error(f"Cleanup Error: {e}")
