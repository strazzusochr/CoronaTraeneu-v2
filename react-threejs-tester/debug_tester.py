
import sys
import os
sys.path.append(os.getcwd())
import react_threejs_tester
from smolagents import CodeAgent, InferenceClientModel

print("Debugging SmolaGents Tools...")

tools = [
    react_threejs_tester.analyze_react_app,
    react_threejs_tester.test_threejs_scene,
    react_threejs_tester.test_webgl_performance,
    react_threejs_tester.test_3d_interactions,
    react_threejs_tester.analyze_3d_rendering_quality
]

model = InferenceClientModel(model_id="Qwen/Qwen2-VL-72B-Instruct")

for t in tools:
    print(f"Testing tool: {t.name}")
    try:
        agent = CodeAgent(
            tools=[t],
            model=model,
            additional_authorized_imports=["helium", "cv2", "numpy", "PIL"],
            name="DebugAgent"
        )
        print(f"✅ Tool {t.name} works!")
    except Exception as e:
        print(f"❌ Tool {t.name} FAILED: {e}")
