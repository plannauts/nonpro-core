# Software 2.0

> **Summary**: A fundamental shift in software development where programs are no longer written line-by-line by humans (Software 1.0), but are instead represented as neural network weights synthesized via optimization (gradient descent) over datasets and evaluation criteria.

---

## 1. Definition & Core Thesis
- **Author**: [[Andrej_Karpathy]] (November 2017).
- **Core Thesis**: Neural networks are not merely another classifier in a machine learning toolbox. They represent the beginning of a fundamental paradigm shift in how we write software.
- **The Classical Stack (Software 1.0)**:
  - Written in explicit instructions (C++, Python, Java) by human programmers.
  - The programmer navigates the discrete program space manually to produce a desired behavior.
- **The Neural Stack (Software 2.0)**:
  - Written in abstract, human-unfriendly language: the continuous weights of a neural network.
  - Humans specify goals (datasets of input-output pairs or objective functions), construct a model architecture (the code skeleton), and use optimization algorithms (Backpropagation + SGD) to search the parameter space for a working program.

## 2. Key Advantages of Software 2.0
1. **Computationally Homogeneous**:
   - At its core, a neural net is a sandwich of two primary primitives: matrix multiplication and thresholding (ReLU).
   - This makes verification, runtime guarantees, and hardware acceleration (ASICs, GPUs) significantly easier compared to heterogeneous CPU instruction sets.
2. **Simple to Bake into Silicon**:
   - Small instruction sets allow low-power intelligence to be embedded directly on-chip for pervasive edge computing.
3. **Constant Running Time & Memory**:
   - Every forward pass takes an exact, deterministic amount of FLOPS and memory with no dynamic allocations, virtually eliminating runaway loops or memory leaks.
4. **Agility & Compression**:
   - Need code to run twice as fast? Prune half the channels and fine-tune. Need higher accuracy? Add channels and scale compute.
5. **Modules Meld into an Optimal Whole**:
   - Unlike 1.0 modules that interact via rigid APIs, separate 2.0 modules can be connected and backpropagated through end-to-end to jointly optimize the entire pipeline.
6. **"It is better than you"**:
   - In complex perceptual domains (vision, speech, translation), optimization finds vastly superior solutions to anything humans can manually code.

## 3. The New Role of the Programmer
- In Software 2.0, the **source code is the dataset** and the **compiled binary is the network weights**.
- Software engineers split into:
  - **2.0 Programmers**: Curate, clean, grow, and label datasets (editing the source code).
  - **1.0 Infrastructure Engineers**: Maintain the training pipelines, labeling interfaces, compute clusters, and evaluation harnesses.

## 4. Connections & Context
- [[Neural_Net_Training_Recipe]] - Practical methodology for developing and debugging 2.0 programs.
- [[Character_Level_Language_Model]] - A prime example where explicit grammar rules are abandoned in favor of learning from raw sequence prediction.
- [[LLM_OS]] - The natural evolution where Software 2.0 forms the central processing unit of computing systems.
- [[Andrej_Karpathy]] - Creator and advocate of this mental model.

---

## Sources & References
- [[../sources/20171112_software_2_0|20171112_software_2_0.md (Medium)]]
