from django import forms
from .models import UserProfile

class SignupForm(forms.ModelForm):
    password1 = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(attrs={'id': 'id_password', 'class': 'form-input'}),
    )
    password2 = forms.CharField(
        label="Confirm Password",
        widget=forms.PasswordInput(attrs={'id': 'id_password2', 'class': 'form-input'}),
    )
    terms = forms.BooleanField(
        required=True,
        widget=forms.CheckboxInput(attrs={'id': 'id_terms', 'class': 'checkbox-input'}),
        label="I agree to the Terms of Service and Privacy Policy"
    )

    class Meta:
        model = UserProfile
        fields = ['full_name', 'email', 'phone', 'dob', 'gender', 'newsletter', 'password1', 'password2']
        widgets = {
            'full_name': forms.TextInput(attrs={'id': 'id_full_name', 'class': 'form-input'}),
            'email': forms.EmailInput(attrs={'id': 'id_email', 'class': 'form-input'}),
            'phone': forms.TextInput(attrs={'id': 'id_phone', 'class': 'form-input'}),
            'dob': forms.DateInput(attrs={'id': 'id_dob', 'class': 'form-input', 'type': 'date'}),
            'gender': forms.RadioSelect(attrs={'class': 'gender-input'}),
            'newsletter': forms.CheckboxInput(attrs={'id': 'id_newsletter', 'class': 'checkbox-input'}),
        }

    def clean_phone(self):
        phone = self.cleaned_data['phone']
        if not phone.isdigit() or len(phone) != 10:
            raise forms.ValidationError("Please enter a valid 10-digit phone number.")
        return phone

    def clean_email(self):
        email = self.cleaned_data['email']
        if UserProfile.objects.filter(email=email).exists():
            raise forms.ValidationError("This email is already registered.")
        return email

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user

class LoginForm(forms.Form):
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'id': 'id_email', 'class': 'form-input'}),
        label="Email Address"
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'id': 'id_password', 'class': 'form-input'}),
        label="Password"
    )
    remember = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={'id': 'id_remember', 'class': 'checkbox-input'}),
        label="Remember me"
    )