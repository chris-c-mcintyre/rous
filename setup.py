from setuptools import setup

setup(
    name="rous",
    version="0.1.0",
    author="chris-c-mcintyre",
    author_email="chris-c-mcintyre@outlook.com",
    url="https://github.com/chris-c-mcintyre/rous",
    description="Doing things the hard way.",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    packages=["rous"],
    package_dir={"rous": "src/rous"},
    install_requires=[""],
)
