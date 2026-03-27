import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report



df = pd.read_csv('../data/heart.csv')
df['target'] = df['target'].apply(lambda x: 0 if x == 1 else 1)

# Features
X = df[['age', 'sex', 'cp', 'trestbps', 'chol',
        'thalach', 'oldpeak', 'ca', 'thal',
        'exang', 'slope']]
y = df['target']



X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)



scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)



model = LogisticRegression()
model.fit(X_train, y_train)



print("\nReport:")
print(classification_report(y_test, model.predict(X_test)))



pickle.dump(model, open('model.pkl', 'wb'))
pickle.dump(scaler, open('scaler.pkl', 'wb'))



tests = [
    [30, 0, 1, 120, 180, 170, 0, 0, 2, 0, 1],
    [65, 1, 3, 150, 300, 120, 3, 2, 3, 1, 2],
]
print("\nSanity Check:")
for t in tests:
    t_scaled = scaler.transform([t])
    prob = model.predict_proba(t_scaled)[0][1]
    print(t, "->", prob)